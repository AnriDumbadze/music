export interface BadgeItem {
    name: string;
    photo: string;
    activePhoto: string;
    id : number
  }

const FooterItems: BadgeItem[] = [
    { name: "Home", photo: "./Icons/home.svg", activePhoto: "./Icons/activeHome.svg"  , id : 1},
    { name: "Library", photo: "./Icons/home.svg", activePhoto: "./Icons/activeHome.svg", id : 2 },
    { name: "Search", photo: "./Icons/home.svg", activePhoto: "./Icons/activeHome.svg",  id : 3}
  ];

  export default FooterItems;