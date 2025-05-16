function saveInput() {
  const oldURL = document.getElementById("oldURL") as HTMLInputElement
  const newURL = document.getElementById("newURL") as HTMLInputElement
  const data = {
    oldURL: oldURL.value,
    newURL: newURL.value,
  }
  fetch("/api/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 200) {
        alert("Saved!")
      } else {
        alert("Error!")
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export default () => {
  return (
    <>
      <h1 class="text-4xl text-center font-extrabold dark:text-white mt-5">
        Save - Enripen
      </h1>
      <p class="text-center text-2xl mt-5">Save an entry!</p>
      <div class="m-10 ">
        <input
          type="text"
          id="oldURL"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Old URL"
          required
        />
      </div>
      <div class="m-10">
        <input
          type="text"
          id="newURL"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="New URL"
          required
        />
        <button
          type="button"
          onClick={saveInput}
          class="block w-full mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
    </>
  )
}
