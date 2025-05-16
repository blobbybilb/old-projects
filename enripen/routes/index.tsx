import { Head } from "$fresh/runtime.ts"
import Page from "$flowbite/components/Page.tsx"
import Search from "../islands/Search.tsx"

export default function Home() {
  return (
    <>
      <Head>
        <title>Enripen</title>
      </Head>
      <Page>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Enripen
            </h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              A crowdsourced index to help against link rot.
            </p>
          </div>
        </section>
        <Search />
      </Page>
    </>
  )
}
