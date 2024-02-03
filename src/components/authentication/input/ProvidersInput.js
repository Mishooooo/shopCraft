import Image from "next/image";
import classes from './ProvidersInput.module.css'
import { signIn } from "next-auth/react";

export default function ProvidersInput({providerName}) {
  return (
    <button
      onClick={() => signIn(providerName)}
      type="submit"
      className={classes.button}
    >
      <Image
        loading="lazy"
        height="24"
        width="24"
        id="provider-logo"
        src={`/images/icons/${providerName}.png`}
        alt={providerName}
      />

      <span>Sign in with <span className={classes.providerName}>{providerName}</span></span>
    </button>
  );
}
