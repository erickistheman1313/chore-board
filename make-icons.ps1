Add-Type -AssemblyName System.Drawing

# Brass medallion on near-black, matching the menu identity.
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

  $rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)
  $bg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 23, 20, 15))
  $g.FillRectangle($bg, $rect)

  # candlelight pooling from the top-left
  $glow = New-Object System.Drawing.Drawing2D.GraphicsPath
  $glow.AddEllipse(-$size * 0.3, -$size * 0.45, $size * 1.5, $size * 1.4)
  $pg = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow)
  $pg.CenterPoint = [System.Drawing.PointF]::new($size * 0.36, $size * 0.16)
  $pg.CenterColor = [System.Drawing.Color]::FromArgb(58, 217, 184, 105)
  $pg.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 217, 184, 105))
  $g.FillRectangle($pg, $rect)

  $cx = $size / 2.0; $cy = $size / 2.0

  # two concentric keylines, the second dashed, like a stamped seal
  $penOuter = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 168, 130, 58), [single]($size * 0.026))
  $g.DrawEllipse($penOuter, $cx - $size * 0.40, $cy - $size * 0.40, $size * 0.80, $size * 0.80)
  $penInner = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 168, 130, 58), [single]($size * 0.016))
  $penInner.DashStyle = [System.Drawing.Drawing2D.DashStyle]::Dash
  $penInner.DashPattern = @([single]2.2, [single]3.0)
  $g.DrawEllipse($penInner, $cx - $size * 0.325, $cy - $size * 0.325, $size * 0.65, $size * 0.65)

  $star = New-StarPath $cx $cy ($size * 0.225) ($size * 0.094)
  $goldRect = New-Object System.Drawing.Rectangle(0, [int]($cy - $size * 0.25), $size, [int]($size * 0.5))
  $gold = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    $goldRect,
    [System.Drawing.Color]::FromArgb(255, 232, 209, 148),
    [System.Drawing.Color]::FromArgb(255, 143, 113, 40),
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
  $g.FillPolygon($gold, $star)

  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

foreach ($s in 152, 167, 180, 192, 512, 1024) {
  New-Icon $s (Join-Path $out "icon-$s.png")
}
"regenerated 6 icons"
