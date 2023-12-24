import Image from 'next/image'

export default function Home() {
  return (
    <div>

      <div className='flex flex-col mx-auto items-center justify-center max-w-2xl'>
        <h1 className='text-center py-10'>Response AI</h1>
        <form>
          <input type='text' className='border' />
          <input type='submit' value={"submit"}></input>
        </form>
      </div>
    </div>
  )
}
