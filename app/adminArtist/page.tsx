"use client"
import Aside, { getCookie } from '../Components/Aside/Aside'
import styles from './artist.module.scss'
import { useState, useEffect } from 'react'
import TopChart from '../Components/TopChart/TopChart'
import Icon from '../Components/Icon/Icon'
import ArtistForm from '../Components/AddArtistForm/artistForm'
import Input from '../Components/Input/input'
import Button from '../Components/Button/Button'
import { Switch } from 'antd';
import axios from 'axios'
import { message, Space } from 'antd';
export default function ArtistAdd() {
  const [themeColor, setThemeColor] = useState<string | null>(getCookie("theme")); 
  const [artistName, setArtistName] = useState("")
  const [artistLastname, setArtistLastname] = useState("")
  const [artistMusicIds, setArtistMusicIds] = useState("")
  const [artistAlbumId, setArtistAlbumId] = useState("")
  const [artistBiography, setArtistBiography] = useState("")
  const [emails, setEmails] = useState("")
  const [albumTitle, setAlbumTitle] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [switchChecked, setSwitchChecked] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCookie("theme");
      setThemeColor(newTheme);
    };

    updateTheme();

    const themeInterval = setInterval(updateTheme, 0); // Adjust interval as needed

    return () => clearInterval(themeInterval);
  }, []);
  const popularCharts = [
    <TopChart image={"topChart"} songName={"Good Days"} artistName={"SZA"} rank={"1"} />,
  ];
  const firstname = (e:any) => {
    setArtistName(e.target.value)
  }

  const lastname = (e:any) => {
    setArtistLastname(e.target.value)
  }

  const email = (e:any) => {
    setEmails(e.target.value)
  }

  const albumname = (e:any) => {
    setAlbumTitle(e.target.value)
  }

  const realseChange = (e:any) => {
    setReleaseDate(e.target.value)
  }

  const onChange = (checked: boolean) => {
  setSwitchChecked(checked)
  };
  
console.log(artistName);

const suggest =() => {
  const userToken = localStorage.getItem("token");
  axios.post(
    "https://music-back-1s59.onrender.com/artist", 
    {
      firstName: artistName,
      lastName: artistLastname,
      biography: artistBiography
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }
  )
  .then((data) => {
    console.log(data);
    messageApi.open({
      type: 'success',
      content: 'წარმატებით შექიმნა!',
    });
  })
  .catch((error) => {
    messageApi.error({
      type: 'error',
      content: 'რატომ გავიხადე?',
    });;
  });
}

const biographyChange = (e:any) => {
  setArtistBiography(e.target.value)
}
 
  return (
    <>
      {contextHolder}
      <div className={styles.mainContent}>
        <Aside />
        <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
          <div className={styles.headerAdmin}>
            <div className={styles.containerIcon}>
              <Icon height={"32px"} width={"32px"} name={"Arrow"} isActive={false} onClick={function (): void {
                throw new Error("Function not implemented.");
              }} />
              <Icon height={"32px"} width={"32px"} name={"rightArr"} isActive={false} onClick={function (): void {
                throw new Error("Function not implemented.");
              }} />
            </div>
            <p className={styles.HeaderTitle}>Add Artists</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.text}>
            <span>First Name</span>
            <Input
            disabled={switchChecked}
            onchange={firstname}
              type="text"
              placeholder=""
              mode="white"
              state="neutral"
            />
            <span>Last Name</span>
            <Input
             disabled={switchChecked}
              onchange={lastname}
              type="text"
              placeholder=""
              mode="white"
              state="neutral"
            />
            <span>Email</span>
            <Input
             disabled={switchChecked}
              onchange={email}
              type="text"
              placeholder=""
              mode="white"
              state="neutral"
            />
            <span>User</span>
            <Input
             disabled={switchChecked}
              type="text"
              placeholder=""
              mode="white"
              state="neutral"
            />
            <span>Biography</span>
        <textarea onChange={biographyChange} disabled={switchChecked}  className={styles.BiographyText} name="" id="" cols="30" rows="60"></textarea>
               <Switch    onChange={onChange} />
            <div className={styles.img}>
            <ArtistForm/>
              <div className={styles.imageText}>
                <span className={styles.iimg}>Trakis Scott</span>
                <span>Profile Photo</span>
                <div className={styles.buttons}>
                  <Button
                    text="Add"
                    width="63px"
                    backgroundColor="#FF5F5F"
                    borderRadius="5px"
                    textColor="#FFFFFF"
                    border="none"
                    padding='4px 16px'
                  />
                  <Button
                    text="view"
                    width="63px"
                    backgroundColor="white"
                    borderRadius="5px"
                    textColor="#898989"
                    border="none"
                    padding='4px 16px'
                  />
                </div>
              </div>
            </div>

            <span className={styles.head}>Add Album</span>
            <div className={styles.line}></div>
            <div className={styles.album}>
              <span>Album name</span>
              <Input
               onchange={albumname}
                type="text"
                placeholder=""
                mode="white"
                state="neutral"
              />
              <span>Album date</span>
              <Input
               onchange={realseChange}
                type="text"
                placeholder=""
                mode="white"
                state="neutral"
              />
              <div className={styles.img}>
               <ArtistForm/>
                <div className={styles.imageText}>
                  <span className={styles.iimg}>Trakis Scott</span>
                  <span>Profile Photo</span>
                  <div className={styles.buttons}>
                  <Button
                    text="Add"
                    width="63px"
                    backgroundColor="#FF5F5F"
                    borderRadius="5px"
                    textColor="#FFFFFF"
                    border="none"
                    padding='4px 16px'
                  />
                  <Button
                    text="view"
                    width="63px"
                    backgroundColor="white"
                    borderRadius="5px"
                    textColor="#898989"
                    border="none"
                    padding='4px 16px'
                  />
                  </div>
                  <Space>
                  <Button
                  click={suggest}
                    text="Suggest"
                    width="90px"
                    backgroundColor="#FF5F5F"
                    borderRadius="5px"
                    textColor="#FFFFFF"
                    border="none"
                    padding='4px 16px'
                  />
                  </Space>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}