import Image from "@/app/components/Image";

type InvitationCoverProps = { subtitle: string; title: string; dateTime: string; location: string; imageSrc: string; className?: string };

export default function InvitationCover({ subtitle, title, dateTime, location, imageSrc, className = "" }: InvitationCoverProps) {
  return <section className={`ds-invitation-cover ${className}`.trim()}><div><p className="type-body-md">{subtitle}</p><h2 className="type-title-lg">{title}</h2></div><Image alt="초대장 이미지" src={imageSrc} /><div className="ds-cover-detail"><span className="type-caption-md">일시</span><p className="type-body-md">{dateTime}</p></div><div className="ds-cover-detail"><span className="type-caption-md">장소</span><p className="type-body-md">{location}</p></div></section>;
}
