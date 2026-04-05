export default function HeadBlock({ title, icon }) {
  return (
    <>
      <div className="block-head">
        <div className="head-title">
          <h1>{title}</h1>
          <img className="w-1 h-1" src={icon} alt="icon" />
        </div>
        <hr />
      </div>
    </>
  );
}
