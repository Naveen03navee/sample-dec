export function MapBackground() {
  return (
    <div className="absolute inset-0 bg-zinc-100 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 390 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {/* Block grid */}
        <g stroke="#e4e4e7" strokeWidth="1">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="700" />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 40} x2="390" y2={i * 40} />
          ))}
        </g>
        {/* Major roads */}
        <g stroke="#d4d4d8" strokeWidth="10" strokeLinecap="round">
          <line x1="0" y1="180" x2="390" y2="180" />
          <line x1="0" y1="420" x2="390" y2="420" />
          <line x1="120" y1="0" x2="120" y2="700" />
          <line x1="280" y1="0" x2="280" y2="700" />
        </g>
        {/* Route */}
        <path
          d="M 80 540 L 80 420 L 280 420 L 280 180 L 320 180"
          stroke="var(--leaf)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Pickup pin */}
        <circle cx="80" cy="540" r="8" fill="var(--spark)" />
        <circle cx="80" cy="540" r="14" fill="var(--spark)" opacity="0.2" />
        {/* Drop pin */}
        <circle cx="320" cy="180" r="8" fill="var(--leaf)" />
        <circle cx="320" cy="180" r="14" fill="var(--leaf)" opacity="0.2" />
        {/* Car */}
        <g transform="translate(280, 300)">
          <circle r="10" fill="white" stroke="var(--leaf)" strokeWidth="3" />
          <circle r="3" fill="var(--leaf)" />
        </g>
      </svg>
    </div>
  );
}