const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
};

function Svg({ size = 18, children, ...props }) {
  return (
    <svg width={size} height={size} {...baseProps} {...props}>
      {children}
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </Svg>
  );
}

export function MapPinIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s6.5-5.4 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.4" />
    </Svg>
  );
}

export function ThermometerIcon(props) {
  return (
    <Svg {...props}>
      <path d="M14 14.6V5a2 2 0 1 0-4 0v9.6a4 4 0 1 0 4 0Z" />
    </Svg>
  );
}

export function DropletIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.2c3.2 3.7 5.6 6.3 5.6 9.2a5.6 5.6 0 1 1-11.2 0c0-2.9 2.4-5.5 5.6-9.2Z" />
    </Svg>
  );
}

export function WindIcon(props) {
  return (
    <Svg {...props}>
      <path d="M3 8.5h10.5a3 3 0 1 0-3-3" />
      <path d="M3 12.5h14a3 3 0 1 1-3 3" />
      <path d="M3 16.5h6.5a2.5 2.5 0 1 1-2.5 2.5" />
    </Svg>
  );
}

export function GaugeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M20.5 17.5a9 9 0 1 0-17 0" />
      <path d="m12 14 3.8-4.6" />
      <circle cx="12" cy="15" r="1.4" />
    </Svg>
  );
}

export function ClockIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </Svg>
  );
}

export function SunIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
    </Svg>
  );
}

export function MoonIcon(props) {
  return (
    <Svg {...props}>
      <path d="M20 14.6A8.6 8.6 0 0 1 9.4 4a8.6 8.6 0 1 0 10.6 10.6Z" />
    </Svg>
  );
}

export function AlertIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 4.2 3.4 19.8h17.2L12 4.2Z" />
      <path d="M12 9.8v4.1" />
      <path d="M12 17h.01" />
    </Svg>
  );
}

export function RefreshIcon(props) {
  return (
    <Svg {...props}>
      <path d="M20 11.2a8 8 0 1 0-2.3 5.9" />
      <path d="M20 4.4v6.8h-6.8" />
    </Svg>
  );
}

export function ArrowUpIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 19V5.5" />
      <path d="m6.5 11 5.5-5.5L17.5 11" />
    </Svg>
  );
}

export function ArrowDownIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 5v13.5" />
      <path d="M6.5 13l5.5 5.5L17.5 13" />
    </Svg>
  );
}

export function EyeIcon(props) {
  return (
    <Svg {...props}>
      <path d="M2.4 12S6 6.2 12 6.2 21.6 12 21.6 12 18 17.8 12 17.8 2.4 12 2.4 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </Svg>
  );
}
