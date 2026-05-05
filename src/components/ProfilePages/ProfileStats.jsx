export default function ProfileStats({ stats }) {
  return (
    <div className="grid grid-cols-4 text-center pt-4 border-t">
      <Stat label="Recipes" value={stats.recipes} />
      <Stat label="Likes" value={stats.likes} />
      <Stat label="Followers" value={Math.floor(stats.likes / 2)} />
      <Stat label="Following" value={0} />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}