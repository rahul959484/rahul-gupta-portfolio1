import fitz
from pathlib import Path

pdf_path = Path("attached_assets/Rahul_Gupta_9594884323_1789122492762.pdf")
output_dir = Path(".agents/outputs/resume")
output_dir.mkdir(parents=True, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"pages={doc.page_count}")
print(f"metadata={doc.metadata}")

all_text = []
for index, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    image_path = output_dir / f"page-{index + 1}.png"
    pix.save(image_path)
    text = page.get_text("text")
    all_text.append(f"--- PAGE {index + 1} ---\n{text}")
    print(f"page={index + 1} size={page.rect.width}x{page.rect.height} images={len(page.get_images(full=True))}")

(output_dir / "text.txt").write_text("\n".join(all_text), encoding="utf-8")
print(f"text_path={output_dir / 'text.txt'}")