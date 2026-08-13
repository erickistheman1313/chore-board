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

  # Matches the in-app boot screen exactly, so the handoff is invisible.
  $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
  $bg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 23, 20, 15))
  $g.FillRectangle($bg, $rect)

  $cx = $w / 2.0; $cy = $h / 2.0
  $r = [Math]::Min($w, $h) * 0.085

  # candlelight pooling from above, as in the app header
  $glow = New-Object System.Drawing.Drawing2D.GraphicsPath
  $glow.AddEllipse($cx - $w * 0.9, $cy - $h * 0.62, $w * 1.8, $h * 0.9)
  $pg = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow)
  $pg.CenterPoint = [System.Drawing.PointF]::new($cx, $cy - $h * 0.2)
  $pg.CenterColor = [System.Drawing.Color]::FromArgb(46, 217, 184, 105)
  $pg.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 217, 184, 105))
  $g.FillRectangle($pg, $rect)

  # seal: solid keyline, dashed keyline, brass star
  $penOuter = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 168, 130, 58), [single]($r * 0.055))
  $g.DrawEllipse($penOuter, $cx - $r, $cy - $r, $r * 2, $r * 2)
  $penInner = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 168, 130, 58), [single]($r * 0.04))
  $penInner.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
  $penInner.DashPattern = @([single]2.2, [single]3.0)
  $g.DrawEllipse($penInner, $cx - $r * 0.81, $cy - $r * 0.81, $r * 1.62, $r * 1.62)

  $star = New-StarPath $cx $cy ($r * 0.56) ($r * 0.235)
  $goldRect = New-Object System.Drawing.Rectangle(0, [int]($cy - $r * 0.6), $w, [int]($r * 1.2))
  $gold = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $goldRect,
    [System.Drawing.Color]::FromArgb(255, 232, 209, 148),
    [System.Drawing.Color]::FromArgb(255, 143, 113, 40),
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
  $g.FillPolygon($gold, $star)

  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::Center
  $cream = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 250, 245, 234))
  $brass = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 168, 130, 58))

  $nameFont = New-Object System.Drawing.Font("Georgia", [single]([Math]::Min($w, $h) * 0.036), [System.Drawing.FontStyle]::Regular)
  $g.DrawString("Family Chores", $nameFont, $cream, [single]$cx, [single]($cy + $r * 1.5), $fmt)

  # letterspaced small caps, drawn a glyph at a time since GDI+ has no tracking
  $estFont = New-Object System.Drawing.Font("Segoe UI", [single]([Math]::Min($w, $h) * 0.0145), [System.Drawing.FontStyle]::Bold)
  $est = "EST. 2026"
  $track = [single]([Math]::Min($w, $h) * 0.011)
  $widths = @(); $total = 0
  foreach ($ch in $est.ToCharArray()) {
    $cw = $g.MeasureString([string]$ch, $estFont).Width - 6
    $widths += $cw; $total += $cw + $track
  }
  $x = $cx - ($total - $track) / 2
  $y = $cy + $r * 1.5 + [Math]::Min($w, $h) * 0.062
  for ($i = 0; $i -lt $est.Length; $i++) {
    $g.DrawString([string]$est[$i], $estFont, $brass, [single]$x, [single]$y)
    $x += $widths[$i] + $track
  }

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
