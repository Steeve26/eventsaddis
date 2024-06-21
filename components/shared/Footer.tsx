import Image from "next/image";

export default function Footer() {
  return (
    <footer id="footer" className="flex flex-col gap-4 items-center justify-center px-8 md:justify-between md:flex-row">
      <div>
        <Image src='/assets/images/logo.svg' alt="logo" width={128} height={38} />
        EventsAddis
      </div>
      <p>2024 EventsAddis®️. All Rights Reserved</p>
    </footer>
  )
}
