import Button from "@/app/components/Button";

const variants = ["primary", "secondary"] as const;
const sizes = ["sm", "md", "lg"] as const;

export default function ButtonTestPage() {
  return (
    <main className="button-test-page">
      <section className="button-test-content" aria-labelledby="button-test-title">
        <p className="eyebrow type-caption-md">COMPONENT TEST</p>
        <h1 id="button-test-title" className="type-display-lg">Button</h1>
        <p className="button-test-description type-body-md">마우스를 올려 호버 상태를 확인하세요.</p>

        {variants.map((variant) => (
          <section className="button-test-section" key={variant} aria-labelledby={`${variant}-title`}>
            <h2 id={`${variant}-title`} className="type-heading-lg">{variant}</h2>
            <div className="button-test-grid">
              {sizes.map((size) => (
                <div className="button-test-item" key={size}>
                  <p className="type-caption-md">{size}</p>
                  <div className="button-test-actions">
                    <Button variant={variant} size={size}>Button</Button>
                    <Button aria-label="비활성 Button" variant={variant} size={size} disabled>Button</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}
