export function HeroSignature() {
  return (
    <div className="signature" aria-hidden="true">
      <svg viewBox="0 0 1180 160" preserveAspectRatio="none">
        <line
          x1="0"
          y1="80"
          x2="1180"
          y2="80"
          stroke="#d7ded5"
          strokeWidth="1"
        />
        <path
          d="M0,80 L260,80 L292,80 L308,30 L326,140 L344,55 L360,80 L400,80 L430,80 L460,60 L480,100 L500,80 L560,80"
          fill="none"
          stroke="#bb8a34"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M560,80 L620,80 L650,45 L700,45 L730,110 L780,110 L810,60 L860,60"
          fill="none"
          stroke="#1c8574"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g stroke="#1c8574" strokeWidth="1.4" fill="#eef2ee">
          <circle cx="860" cy="60" r="5" />
          <circle cx="940" cy="30" r="5" />
          <circle cx="960" cy="100" r="5" />
          <circle cx="1040" cy="55" r="5" />
          <circle cx="1080" cy="115" r="5" />
          <circle cx="1150" cy="70" r="5" />
          <line x1="860" y1="60" x2="940" y2="30" />
          <line x1="860" y1="60" x2="960" y2="100" />
          <line x1="940" y1="30" x2="1040" y2="55" />
          <line x1="960" y1="100" x2="1040" y2="55" />
          <line x1="1040" y1="55" x2="1080" y2="115" />
          <line x1="1040" y1="55" x2="1150" y2="70" />
          <line x1="1080" y1="115" x2="1150" y2="70" />
        </g>
      </svg>
      <div className="sig-caption">
        <span>Clinical signal</span>
        <span>Where evidence becomes intelligence</span>
        <span>Applied network</span>
      </div>
    </div>
  );
}
