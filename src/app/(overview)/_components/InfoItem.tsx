type InfoItemProps = {
  label: string;
  value?: string | null;
};

const InfoItem = ({ label, value }: InfoItemProps) => {
  if (!value) return null;

  return (
    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="text-sm font-medium">{label}</div>
      <div className="max-w-[180px] truncate rounded-md bg-secondary p-1 font-mono text-xs">
        {value}
      </div>
    </div>
  );
};
export default InfoItem;
