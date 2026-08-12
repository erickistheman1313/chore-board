Add-Type -AssemblyName System.Drawing

# iOS only shows a launch image when one matches the device exactly, so we draw
# every current iPhone/iPad size. Without a match it launches on plain white.
$sizes = @(
  @{w=1170; h=2532}, @{w=1179; h=2556}, @{w=1206; h=2622},   # iPhone 12/13/14/15/16
  @{w=1284; h=2778}, @{w=1290; h=2796}, @{w=1320; h=2868},   # Plus / Pro Max
  @{w=1125; h=2436}, @{w=1242; h=2688}, @{w=828;  h=1792},   # X / XS Max / XR
  @{w=750;  h=1334}, @{w=1242; h=2208},                       # SE, 8 Plus
  @{w=1536; h=2048}, @{w=1620; h=2160}, @{w=1668; h=2224},   # iPad, Air
  @{w=1668; h=2388}, @{w=2048; h=2732}                        # iPad Pro
)

$out = Join-Path $PSScriptRoot "splash"
New-Item -ItemType Directory -Force $out | Out-Null

function New-StarPath([single]$cx, [single]$cy, [single]$outer, [single]$inner) {
  $pts = New-Object 'System.Collections.Generic.List[System.Drawing.PointF]'
  for ($i = 0; $i -lt 10; $i++) {
    $r = if ($i % 2 -eq 0) { $outer } else { $inner }
    $a = (-90 + $i * 36) * [Math]::PI / 180
    $pts.Add([System.Drawing.PointF]::new($cx + $r * [Math]::Cos($a), $cy + $r * [Math]::Sin($a)))
  }
  return $pts.ToArray()
}

foreach ($s in $sizes) {
  $w = [int]$s.w; $h = [int]$s.h
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

  # Same gradient as the in-app boot screen so the handoff is invisible.
  $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
  $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect,
    [System.Drawing.Color]::FromArgb(255, 30, 75, 192),
    [System.Drawing.Color]::FromArgb(255, 18, 42, 110),
    [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal)
  $g.FillRectangle($bg, $rect)

  $cx = $w / 2.0; $cy = $h / 2.0
  $r = [Math]::Min($w, $h) * 0.115

  $star = New-StarPath $cx ($cy - $r * 0.3) $r ($r * 0.42)
  $goldRect = New-Object System.Drawing.Rectangle(0, [int]($cy - $r * 1.4), $w, [int]($r * 2.4))
  $gold = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $goldRect,
    [System.Drawing.Color]::FromArgb(255, 255, 226, 120),
    [System.Drawing.Color]::FromArgb(255, 240, 150, 20),
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
  $ink = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 20, 18, 42), [single]($r * 0.14))
  $ink.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $g.FillPolygon($gold, $star)
  $g.DrawPolygon($ink, $star)

  $fontSize = [single]([Math]::Min($w, $h) * 0.042)
  $font = New-Object System.Drawing.Font("Segoe UI", $fontSize, [System.Drawing.FontStyle]::Bold)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::Center
  $white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
  $g.DrawString("Family Chores", $font, $white, [single]$cx, [single]($cy + $r * 1.15), $fmt)

  $g.Dispose()
  $bmp.Save((Join-Path $out "splash-$w`x$h.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

# Emit the matching <link> tags; iOS needs one per device with exact media queries.
# Dividing each pixel size by both 2 and 3 yields widths no device actually has
# (585, 660, ...), so keep only real portrait CSS widths.
$realWidths = 375, 390, 393, 402, 414, 428, 430, 440, 744, 768, 810, 820, 834, 1024, 1032

$lines = foreach ($s in $sizes) {
  $w = [int]$s.w; $h = [int]$s.h
  foreach ($ratio in 2, 3) {
    if (($w % $ratio) -ne 0 -or ($h % $ratio) -ne 0) { continue }
    $dw = $w / $ratio; $dh = $h / $ratio
    if ($realWidths -notcontains $dw) { continue }
    "<link rel=""apple-touch-startup-image"" href=""splash/splash-$w`x$h.png"" media=""(device-width: $($dw)px) and (device-height: $($dh)px) and (-webkit-device-pixel-ratio: $ratio) and (orientation: portrait)"">"
  }
}
$lines | Sort-Object -Unique | Set-Content (Join-Path $PSScriptRoot "splash-tags.html") -Encoding ascii

"generated $($sizes.Count) launch images"
"wrote splash-tags.html with $(($lines | Sort-Object -Unique).Count) link tags"
