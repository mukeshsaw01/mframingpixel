import Image from 'next/image'
import logoPng from '../../../../logo.png'

const Logo = ({ className = '' }: { className?: string }) => (
  <Image
    src={logoPng}
    alt="Framingpixel"
    width={logoPng.width}
    height={logoPng.height}
    priority
    sizes="(max-width: 768px) 160px, 220px"
    className={`h-14 w-auto ${className}`}
  />
)

export default Logo
