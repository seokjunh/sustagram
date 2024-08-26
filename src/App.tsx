import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [picture, setPicture] = useState([
    "https://cdn.pixabay.com/photo/2013/08/26/09/40/silhouette-175970_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/11/25/09/42/rocks-1061540_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/09/23/12/33/building-3697342_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/05/02/12/43/clouds-335969_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/12/28/21/10/streets-7683842_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/01/08/05/45/mountain-7704584_1280.jpg",
  ]);

  const [deleteImageSet, setDeleteImageSet] = useState<string[]>([]);

  const deleteHandler = (deleteIndex: number) => {
    setDeleteImageSet((deleteImageSet) => [
      ...deleteImageSet,
      picture[deleteIndex],
    ]);
    setPicture((picture) => picture.filter((_, i) => i !== deleteIndex));
  };

  const onRecoverHandler = () => {
    if (deleteImageSet.length === 0) return;

    // 변수를 직접 건드리는 것보다
    // const delImg = deleteImageSet.shift();
    // setDeleteImageSet([...deleteImageSet]);

    // 이렇게 개선해볼 수 있다.
    // useState의 setter 함수를 이용해서 변수(getter)를 제어한다는 것을 생각하자!
    const [delImg, ...remainImg] = deleteImageSet;
    setDeleteImageSet(remainImg);

    if (delImg) {
      setPicture((picture) => [...picture, delImg]);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.body.className = "dark";
    } else {
      document.body.className = "";
    }
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      {/* {darkMode.toString()} */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">SUSTAGRAM</h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode((darkMode) => !darkMode)}>
            <img
              src={darkMode ? "/moon.svg" : "/sun.svg"}
              className="h-10 ml-4"
            />
          </button>
          <button onClick={onRecoverHandler}>
            <img src="/redo_icon-icons.webp" className="h-10 ml-4" />
          </button>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-4">
        {picture.map((value, index) => (
          <div className="group relative" key={index}>
            <a className="group" href="#">
              <img
                src={value}
                width="400"
                height="400"
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                style={{ aspectRatio: "400 / 400", objectFit: "cover" }}
              />
            </a>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-600 h-10 w-10 absolute top-2 right-2 rounded-full"
              onClick={() => deleteHandler(index)}
            >
              <img src="/delete.svg" alt="Delete icon" className="h-4 w-4" />
              <span className="sr-only">Delete</span>
              {}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
