param(
  [Parameter(Mandatory = $true)][string]$InputPath,
  [Parameter(Mandatory = $true)][string]$OutputPath
)

$ErrorActionPreference = "Stop"

$inputFull = [System.IO.Path]::GetFullPath($InputPath)
$outputFull = [System.IO.Path]::GetFullPath($OutputPath)

if (-not (Test-Path -LiteralPath $inputFull)) {
  throw "Input file not found: $inputFull"
}

$outputDir = [System.IO.Path]::GetDirectoryName($outputFull)
if ($outputDir -and -not (Test-Path -LiteralPath $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
$doc = $null

try {
  $doc = $word.Documents.Open($inputFull, $false, $true)
  # 16 = wdFormatXMLDocument (.docx)
  $doc.SaveAs2($outputFull, 16)
}
finally {
  if ($doc -ne $null) {
    $doc.Close($false) | Out-Null
  }
  $word.Quit() | Out-Null
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}

if (-not (Test-Path -LiteralPath $outputFull)) {
  throw "Word did not write output: $outputFull"
}
