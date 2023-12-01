const data = [
  {
    id: 1,
    text: "In rhinoplasty, an area is cut on the outside of the nose. The columella, part of the septum, is the area where the incision is made. This cut is usually like a triangle with an open end",
    imageUrl:
      "https://img.freepik.com/free-photo/beautiful-shot-crystal-clear-lake-snowy-mountain-base-during-sunny-day_181624-5459.jpg?size=626&ext=jpg&ga=GA1.1.1625254774.1695638613&semt=sph",
  },
  {
    id: 2,
    text: "Because the sore is under your nose, it can be difficult for others to see. The scar is only visible if someone is shorter than you or if your head is up. Normally, it is unlikely that most people will notice a scar.",
    imageUrl:
      "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg&ga=GA1.1.1625254774.1695638613&semt=sph",
  },
  {
    id: 3,
    text: "In rhinoplasty, an area is cut on the outside of the nose. The columella, part of the septum, is the area where the incision is made. This cut is usually like a triangle with an open end",
    imageUrl:
      "https://img.freepik.com/free-photo/low-angle-shot-park-covered-leaves-surrounded-by-bushes-trees_181624-10339.jpg?size=626&ext=jpg&ga=GA1.1.1625254774.1695638613&semt=sph",
  },
  // Add more items as needed
];
import { useState } from "react";
const ChatInformation = () => {
  const [showInformation, setShowInformation] = useState(true);
  return (
    <>
      {showInformation && (
        <div className=" mx-auto px-4 py-8">
          {/* <h1 className="text-3xl font-bold mb-4">Data Display</h1> */}
          <div className="flex flex-col  justify-center items-center rounded-lg border pt-8">
            <div className=" ml-auto pr-8 cursor-pointer">
              <img
                onClick={() => setShowInformation(false)}
                src="./Acord/cross.svg"
                alt=""
              />
            </div>
            {data.map((item) => (
              <div
                key={item.id}
                className="flex  justify-between w-full items-center p-4 m-4  "
              >
                <p className="text-lg font-semibold">{item.text}</p>
                <img
                  src={item.imageUrl}
                  alt={item.text}
                  className="w-32 h-32 rounded mb-2 cover-fill"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatInformation;
