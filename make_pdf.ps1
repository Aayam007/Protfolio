$streamPath = 'e:\Protfolio\tmp_stream.txt'
$pdfPath = 'e:\Protfolio\Web_Design_Syllabus.pdf'
$streamText = Get-Content -Path $streamPath -Raw
$encoding = [System.Text.Encoding]::ASCII
$ms = New-Object System.IO.MemoryStream
$sw = New-Object System.IO.StreamWriter($ms, $encoding)
$sw.NewLine = "`n"

$offsets = New-Object System.Collections.Generic.List[int]
$offsets.Add(0)

$sw.WriteLine('%PDF-1.4')
$sw.Flush()

$offsets.Add([int]$ms.Position)
$sw.WriteLine('1 0 obj')
$sw.WriteLine('<< /Type /Catalog /Pages 2 0 R >>')
$sw.WriteLine('endobj')
$sw.Flush()

$offsets.Add([int]$ms.Position)
$sw.WriteLine('2 0 obj')
$sw.WriteLine('<< /Type /Pages /Kids [3 0 R] /Count 1 >>')
$sw.WriteLine('endobj')
$sw.Flush()

$offsets.Add([int]$ms.Position)
$sw.WriteLine('3 0 obj')
$sw.WriteLine('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>')
$sw.WriteLine('endobj')
$sw.Flush()

$offsets.Add([int]$ms.Position)
$sw.WriteLine('4 0 obj')
$sw.WriteLine('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')
$sw.WriteLine('endobj')
$sw.Flush()

$offsets.Add([int]$ms.Position)
$sw.WriteLine('5 0 obj')
$sw.WriteLine("<< /Length $($streamText.Length) >>")
$sw.WriteLine('stream')
$sw.Flush()

$bytes = $encoding.GetBytes($streamText)
$ms.Write($bytes, 0, $bytes.Length)

$sw.WriteLine()
$sw.WriteLine('endstream')
$sw.WriteLine('endobj')
$sw.Flush()

$startXref = [int]$ms.Position

$sw.WriteLine('xref')
$sw.WriteLine('0 6')
$sw.WriteLine('0000000000 65535 f ')
for ($i = 1; $i -le 5; $i++) {
    $sw.WriteLine(("{0:0000000000} 00000 n " -f $offsets[$i]))
}
$sw.WriteLine('trailer')
$sw.WriteLine('<< /Size 6 /Root 1 0 R >>')
$sw.WriteLine('startxref')
$sw.WriteLine($startXref)
$sw.Write('%%EOF')
$sw.Flush()
$sw.Dispose()

[System.IO.File]::WriteAllBytes($pdfPath, $ms.ToArray())
$ms.Dispose()
