import React from "react";
import classes from "./Footer.module.css";
import Link from "next/link";
import ScrollToTop from "./ScrollToTop";
import { BriefcaseIcon, ChatIcon, MailIcon } from "@heroicons/react/outline";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <ScrollToTop />
      <div className={classes.container}>
   
          <div className={classes.sourceCode}>
            <Link target="blank" href="https://github.com/Mishooooo/shopCraft">
              <img src="/images/icons/github.png" alt="icon" />
              Source code
            </Link>
          </div>

        <div>
          <div>
            <h5>Social media</h5>
            <hr />
            <ul className={classes.socialMedia}>
              <li>
                <Link
                  target="blank"
                  href="https://www.linkedin.com/in/misho-sisvadze-932612254/"
                >
                  <img src="/images/icons/linkedin.png" alt="icon" />
                  Linkedin
                </Link>
              </li>
              <li>
                <Link
                  target="blank"
                  href="https://www.facebook.com/mishoSisva/"
                >
                  <img src="/images/icons/facebook.png" alt="icon" />
                  facebook
                </Link>
              </li>
              <li>
                <Link
                  target="blank"
                  href="https://www.instagram.com/mishosisvadze38"
                >
                  <img src="/images/icons/instagram.png" alt="icon" />
                  instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h5>Contact</h5>
          <hr />
          <li className={classes.mailInfo}>
            <MailIcon />
            misho.sisvadze28@gmail.com
          </li>
          <li>
            <Link
              target="blank"
              href={"/user-page/messages/" + process.env.MONGODB_ADMINS_ID}
            >
              <ChatIcon />
              Contact with application
            </Link>
          </li>
        </div>
      </div>
      <p className={classes.copyright}> Copyright © Mikheil sisvadze</p>
    </footer>
  );
}
