import React from "react";
import { SocialMediaIconsReact } from "social-media-icons-react";

function Footer() {
  return (
    <div className="footer">
      <a href="#" className="policy">
        Cookie Policy - Legal Notice
      </a>
      <span style={{ color: "black" }}>
        Copyright © 2021. Made with ♥ from seepossible
      </span>
      <div className="header-right">
        <SocialMediaIconsReact icon="facebook" borderColor="rgba(0,0,0,0.25)" />
        &nbsp;
        <SocialMediaIconsReact
          icon="instagram"
          borderColor="rgba(0,0,0,0.25)"
        />
        &nbsp;
        <SocialMediaIconsReact icon="twitter" borderColor="rgba(0,0,0,0.25)" />
        &nbsp;
        <SocialMediaIconsReact
          icon="pinterest"
          borderColor="rgba(0,0,0,0.25)"
        />
      </div>
    </div>
  );
}

export default Footer;
