Add-Type -AssemblyName System.Drawing

$out = Join-Path $PSScriptRoot "icons"
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

function New-Icon([int]$size, [string]$path) {
  $bmp = New-Object System.Drawing.Bitmap($size, $size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

  $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)

  # Cel sky: light blue up top falling to the poster's deeper blue
  $sky = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $rect,
    [System.Drawing.Color]::FromArgb(255, 128, 206, 255),
    [System.Drawing.Color]::FromArgb(255, 27, 106, 196),
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
  $g.FillRectangle($sky, $rect)

  # Radiating burst behind the star
  $burst = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(46, 255, 255, 255))
  for ($i = 0; $i -lt 12; $i++) {
    $a = $i * 30 * [Math]::PI / 180
    $w = $size * 0.085
    $len = $size * 0.85
    $p = @(
      [System.Drawing.PointF]::new($size / 2, $size / 2),
      [System.Drawing.PointF]::new($size / 2 + $len * [Math]::Cos($a - 0.06), $size / 2 + $len * [Math]::Sin($a - 0.06)),
      [System.Drawing.PointF]::new($size / 2 + $len * [Math]::Cos($a + 0.06), $size / 2 + $len * [Math]::Sin($a + 0.06))
    )
    $g.FillPolygon($burst, $p)
  }

  # The star: gold fill, heavy ink outline, like the poster's stars
  $star = New-StarPath ($size / 2) ($size * 0.5) ($size * 0.365) ($size * 0.152)
  $goldRect = New-Object System.Drawing.Rectangle(0, [int]($size * 0.14), $size, [int]($size * 0.74))
  $gold = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $goldRect,
    [System.Drawing.Color]::FromArgb(255, 255, 226, 120),
    [System.Drawing.Color]::FromArgb(255, 240, 150, 20),
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
  $ink = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 20, 18, 42), [single]($size * 0.052))
  $ink.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $g.FillPolygon($gold, $star)
  $g.DrawPolygon($ink, $star)

  # Two small sparkles, the poster's shorthand for "shiny and done"
  $sparkle = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 255, 255, 255))
  foreach ($s in @(@(0.185, 0.225, 0.062), @(0.842, 0.755, 0.045))) {
    $sx = $size * $s[0]; $sy = $size * $s[1]; $sr = $size * $s[2]
    $g.FillPolygon($sparkle, @(
      [System.Drawing.PointF]::new($sx, $sy - $sr),
      [System.Drawing.PointF]::new($sx + $sr * 0.26, $sy - $sr * 0.26),
      [System.Drawing.PointF]::new($sx + $sr, $sy),
      [System.Drawing.PointF]::new($sx + $sr * 0.26, $sy + $sr * 0.26),
      [System.Drawing.PointF]::new($sx, $sy + $sr),
      [System.Drawing.PointF]::new($sx - $sr * 0.26, $sy + $sr * 0.26),
      [System.Drawing.PointF]::new($sx - $sr, $sy),
      [System.Drawing.PointF]::new($sx - $sr * 0.26, $sy - $sr * 0.26)
    ))
  }

  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  "  $path"
}

foreach ($s in 152, 167, 180, 192, 512, 1024) {
  New-Icon $s (Join-Path $out "icon-$s.png")
}
"done"
