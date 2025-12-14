import Image from 'next/image';

const styles = {
  heading: "relative text-green-600 dark:text-green-500 top-0 text-center text-4xl font-bold text-heading md:text-5xl lg:text-6xl",
  subHeading: "text-xs italic text-green-600 dark:text-green-500 font-normal text-body lg:text-xl",
  centerPanel: "relative flex flex-col gap-y-[2vh] h-screen w-1/3 items-center justify-center mx-auto shadow-lg shadow-stone-500 bg-gray-300 dark:shadow-stone-950 dark:bg-gray-800 min-h-[300px] min-w-[235px]",
  imgContainer: "relative hidden md:block flex justify-center items-center w-[10vw] h-[17.5vh]",
  img: "object-scale-down max-w-full max-h-full m-auto",
  button: "text-gray-300 text-base from-purple-500 to-violet-800 dark:text-gray-800 dark:from-teal-200 dark:to-sky-600 hover:cursor-pointer font-semibold font-stretch-expanded bg-gradient-to-br hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-violet-900 dark:focus:ring-sky-100 font-medium text-md px-4 py-2 text-center flex items-center justify-center w-[9vw] h-[4vh] min-w-[150px] min-h-[40px]",
  smallText: "absolute bottom-0 p-[5] text-center text-xs",
};

export default function Landing() {
  return (
    <div className={styles.centerPanel}>
      <h1 className={styles.heading}>Xedni</h1>
      <p className={styles.subHeading}>A portal to every possibility</p>
      <div className={styles.imgContainer}>
        <Image className={styles.img} aria-hidden src="/logo.png" alt="Xedni Logo" fill />
      </div>
      <button className={styles.button}>Create New</button>
      <button className={styles.button}>Load Existing</button>
      <p className={styles.smallText}>© {new Date().getFullYear()} Rachel Lewis</p>
    </div>
  );
}