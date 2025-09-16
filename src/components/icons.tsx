export const SokkoSasaLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 160 90"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily="sans-serif"
    fontWeight="normal"
  >
    <path
      d="M65,35 C65,30 60,25 55,25 L45,25 C40,25 35,30 35,35"
      stroke="black"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M30 40 H70 V55 C70,65 60,65 60,65 L53,65 C53,65 49,69 45,69 C41,69 37,65 37,65 L30,65 V40 Z"
      fill="#F97316"
    />
    <path
      d="M45,75 C45,75 55,75 55,65 L35,65 C35,75 45,75 45,75 Z"
      fill="black"
    />
    <text x="35" y="90" fontSize="20" fill="black">
      Sokko
    </text>
    <text x="95" y="90" fontSize="20" fill="#F97316">
      Sasa
    </text>
  </svg>
);
