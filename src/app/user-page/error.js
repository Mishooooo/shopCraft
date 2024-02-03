'use client'
import ErrorPage from "@/components/error/ErrorPage";

export default function Error({error, reset}) {
  return (
    <ErrorPage error={error} reset={reset}/>
  )
}
