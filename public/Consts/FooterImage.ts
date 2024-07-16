interface BadgeItem {
    name: string;
    photo: string;
    activePhoto: string;
    id : number
  }

const FooterItems: BadgeItem[] = [
    { name: "Home", photo: "./home.svg", activePhoto: "./activeHome.svg"  , id : 1},
    { name: "Library", photo: "./home.svg", activePhoto: "./activeHome.svg", id : 2 },
    { name: "Search", photo: "./home.svg", activePhoto: "./activeHome.svg",  id : 3}
  ];

  export default FooterItems;