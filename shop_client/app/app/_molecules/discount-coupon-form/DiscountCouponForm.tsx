import Button from "../../_atoms/button/Button";

export default () => {
  return (
    <form className="text-sm">
      <i className="icon-envelop relative text-slate-400 left-[30px]"></i>
      <input
        className="w-[320px] pl-12 py-3 rounded-l"
        placeholder="EMAIL ADDRESS"
      />
      <Button className="bg-orange py-3 px-6 rounded-r">Get the Coupon</Button>
    </form>
  );
};
