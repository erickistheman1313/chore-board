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
$g.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 23, 20, 15))), $rect)

# candlelight from above
$glow = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow.AddEllipse(-200, -420, 1600, 900)
$pg = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow)
$pg.CenterPoint = [System.Drawing.PointF]::new(600, -40)
$pg.CenterColor = [System.Drawing.Color]::FromArgb(64, 217, 184, 105)
$pg.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 217, 184, 105))
$g.FillRectangle($pg, $rect)

function New-StarPath([single]$cx, [single]$cy, [single]$outer, [single]$inner) {
  $pts = New-Object 'System.Collections.Generic.List[System.Drawing.PointF]'
  for ($i = 0; $i -lt 10; $i++) {
    $r = if ($i % 2 -eq 0) { $outer } else { $inner }
    $a = (-90 + $i * 36) * [Math]::PI / 180
    $pts.Add([System.Drawing.PointF]::new($cx + $r * [Math]::Cos($a), $cy + $r * [Math]::Sin($a)))
  }
  return $pts.ToArray()
}

$brassCol = [System.Drawing.Color]::FromArgb(255, 168, 130, 58)
$cx = 600.0; $cy = 250.0; $r = 74.0

$penOuter = New-Object System.Drawing.Pen($brassCol, 3.4)
$g.DrawEllipse($penOuter, $cx - $r, $cy - $r, $r * 2, $r * 2)
$penInner = New-Object System.Drawing.Pen($brassCol, 2.4)
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
$brass = New-Object System.Drawing.SolidBrush($brassCol)
$muted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 180, 169, 143))

$titleFont = New-Object System.Drawing.Font("Georgia", 58, [System.Drawing.FontStyle]::Regular)
$g.DrawString("Family Chores", $titleFont, $cream, [single]$cx, 372, $fmt)

$subFont = New-Object System.Drawing.Font("Georgia", 22, [System.Drawing.FontStyle]::Italic)
$sub = "Tonight's courses, plated and priced"
$size = $g.MeasureString($sub, $subFont)
if ($size.Width -gt ($w - 80)) { Write-Warning "subtitle overflows: $sub" }
$g.DrawString($sub, $subFont, $muted, [single]$cx, 468, $fmt)

# letterspaced small caps: GDI+ has no tracking, so place each glyph
$estFont = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Bold)
$est = "EST. 2026"
$track = 9.0
$widths = @(); $total = 0.0
foreach ($ch in $est.ToCharArray()) {
  $cw = $g.MeasureString([string]$ch, $estFont).Width - 6
  $widths += $cw; $total += $cw + $track
}
$x = $cx - ($total - $track) / 2
foreach ($i in 0..($est.Length - 1)) {
  $g.DrawString([string]$est[$i], $estFont, $brass, [single]$x, 528)
  $x += $widths[$i] + $track
}

# hairline rules flanking a lozenge, echoing the app header
$rulePen = New-Object System.Drawing.Pen($brassCol, 1.6)
$g.DrawLine($rulePen, 430, 566, 560, 566)
$g.DrawLine($rulePen, 640, 566, 770, 566)
$g.TranslateTransform(600, 566); $g.RotateTransform(45)
$g.FillRectangle($brass, -5, -5, 10, 10)
$g.ResetTransform()

$g.Dispose()
$bmp.Save((Join-Path $PSScriptRoot "share.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
"wrote share.png ({0}x{1})" -f $w, $h
