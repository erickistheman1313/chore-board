Add-Type -AssemblyName System.Drawing

# 1200x630 preview card shown when the link is sent in Messages, WhatsApp, etc.
# Deliberately says nothing about who lives here - link previews are visible to
# whoever is in the chat.
$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $rect,
  [System.Drawing.Color]::FromArgb(255, 30, 75, 192),
  [System.Drawing.Color]::FromArgb(255, 18, 42, 110),
  [System.Drawing.Drawing2D.LinearGradientMode]::ForwardDiagonal)
$g.FillRectangle($bg, $rect)

# Faint radiating burst, echoing the icon.
$burst = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(20, 255, 255, 255))
for ($i = 0; $i -lt 14; $i++) {
  $a = $i * 25.7 * [Math]::PI / 180
  $len = 1400
  $p = @(
    [System.Drawing.PointF]::new(300, 315),
    [System.Drawing.PointF]::new(300 + $len * [Math]::Cos($a - 0.05), 315 + $len * [Math]::Sin($a - 0.05)),
    [System.Drawing.PointF]::new(300 + $len * [Math]::Cos($a + 0.05), 315 + $len * [Math]::Sin($a + 0.05))
  )
  $g.FillPolygon($burst, $p)
}

function New-StarPath([single]$cx, [single]$cy, [single]$outer, [single]$inner) {
  $pts = New-Object 'System.Collections.Generic.List[System.Drawing.PointF]'
  for ($i = 0; $i -lt 10; $i++) {
    $r = if ($i % 2 -eq 0) { $outer } else { $inner }
    $a = (-90 + $i * 36) * [Math]::PI / 180
    $pts.Add([System.Drawing.PointF]::new($cx + $r * [Math]::Cos($a), $cy + $r * [Math]::Sin($a)))
  }
  return $pts.ToArray()
}

$star = New-StarPath 300 315 132 55
$goldRect = New-Object System.Drawing.Rectangle(0, 180, $w, 270)
$gold = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  $goldRect,
  [System.Drawing.Color]::FromArgb(255, 255, 226, 120),
  [System.Drawing.Color]::FromArgb(255, 240, 150, 20),
  [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$ink = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 20, 18, 42), 17)
$ink.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
$g.FillPolygon($gold, $star)
$g.DrawPolygon($ink, $star)

$white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$soft = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 160, 200, 250))

$title = New-Object System.Drawing.Font("Segoe UI", 62, [System.Drawing.FontStyle]::Bold)
$sub = New-Object System.Drawing.Font("Segoe UI", 27, [System.Drawing.FontStyle]::Regular)
$g.DrawString("Family Chores", $title, $white, 512, 228)

# Measure rather than guess, so no line runs off the canvas.
$lines = @("Check off chores. Keep your streak.", "Watch your balance grow.")
$y = 334
foreach ($line in $lines) {
  $size = $g.MeasureString($line, $sub)
  if (($size.Width + 518) -gt ($w - 24)) { Write-Warning "line overflows: $line" }
  $g.DrawString($line, $sub, $soft, 518, $y)
  $y += 44
}

$g.Dispose()
$bmp.Save((Join-Path $PSScriptRoot "share.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
"wrote share.png ({0}x{1})" -f $w, $h
