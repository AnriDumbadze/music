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
import Cookies from "js-cookie";
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
  const [showAddArtist, setShowaddArtist] = useState(false)
  const [listArtist, setListArtist] = useState(true)
  const [getData, setGetData] = useState([])
  const [search,setSearch] = useState('')
  const [searchData, setSearchData] = useState([])
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
  const firstname = (e: any) => {
    setArtistName(e.target.value)
  }

  const lastname = (e: any) => {
    setArtistLastname(e.target.value)
  }

  const email = (e: any) => {
    setEmails(e.target.value)
  }

  const albumname = (e: any) => {
    setAlbumTitle(e.target.value)
  }

  const realseChange = (e: any) => {
    setReleaseDate(e.target.value)
  }

  const onChange = (checked: boolean) => {
    setSwitchChecked(checked)
  };

  console.log(artistName);

  const suggest = () => {
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
      setTimeout(() => {
        setShowaddArtist(false)
        setListArtist(true)
      }, 2000);
      })
      .catch((error) => {
        messageApi.error({
          type: 'error',
          content: 'რატომ გავიხადე?',
        });;
      });
  }

  const biographyChange = (e: any) => {
    setArtistBiography(e.target.value)
  }

  const searchArtist = (e:any) =>{
    setSearch(e.target.value)
  }

  console.log(search);
  

  useEffect(() => {
    const userToken = Cookies.get("userToken");

    axios.get('https://music-back-1s59.onrender.com/artist', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((r) => {
      setGetData(r.data)
    })
  }, [])

  const click = () => {
    setShowaddArtist(true)
    setListArtist(false)
  } 

  useEffect(() => {
    const userToken = localStorage.getItem("token");

    if (userToken && search) { 
      axios.get(`https://music-back-1s59.onrender.com/search/artist?search=${search}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => {
          setSearchData(response.data)
          
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log('Unauthorized: Invalid token');
          } else {
            console.log('Error:', error.message);
          }
        });
    }
  }, [search]); 
  return (
    <>
      {contextHolder}
      {showAddArtist && (
        <div className={styles.mainContent}>
          <Aside />
          <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
            <div className={styles.headerAdmin}>
              <div className={styles.containerIcon}>
                <Icon height={"32px"} width={"32px"} name={"Arrow"} isActive={false} onClick={() => { }} />
                <Icon height={"32px"} width={"32px"} name={"rightArr"} isActive={false} onClick={() => { }} />
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
              <textarea onChange={biographyChange} disabled={switchChecked} className={styles.BiographyText} cols="30" rows="60"></textarea>
              <Switch onChange={onChange} />
              <div className={styles.img}>
               <input type="file" />
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
<div className={styles.containerMusic}>

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
                  <ArtistForm />
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



            
              <div className={styles.album}>
                <span>Music name</span>
                <Input
                  onchange={albumname}
                  type="text"
                  placeholder=""
                  mode="white"
                  state="neutral"
                />
                <span>music url</span>
                <Input
                  onchange={realseChange}
                  type="text"
                  placeholder=""
                  mode="white"
                  state="neutral"
                />
                <div className={styles.img}>
                  <ArtistForm />
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
          </div>
        </div>
      )}
      {listArtist && (
        <div className={styles.mainContent}>
          <Aside />
          <div className={`${styles.static} ${themeColor === 'dark' ? styles.darkStatic : ''}`}>
           <div className={styles.container}>
           <div className={styles.headerAdmin}>
              <div className={styles.containerIcon}>
                <Icon height={"32px"} width={"32px"} name={"Arrow"} isActive={false} onClick={() => { }} />
                <Icon height={"32px"} width={"32px"} name={"rightArr"} isActive={false} onClick={() => { }} />
              </div>
              <p className={styles.HeaderTitle}>Artists</p>
            </div>
            <div className={styles.contaienrGroup}>
              <button onClick={click} className={styles.btn1}>   <Icon height={"24px"} width={"24px"} name={"add"} isActive={false} onClick={() => { }} />Add Artists</button>
           <div className={styles.search}>
        <div className={styles.icon}>
        <Icon  name={"searchIcon"} isActive={false} onClick={function (): void {
            throw new Error("Function not implemented.");
          } }  />
        </div>
          <input onChange={searchArtist} placeholder='Search' type="text" className={styles.artistSearch} />
           </div>
            </div>
           </div>
           <div className={styles.listArtist}>
            <div className={styles.list}>
              <div className={styles.listInfo}>
                <div className={styles.items}>
                <p>Name</p>
                <p>Email</p>
                <p>User</p>
                <p>Profile</p>
                 <p>Status</p>
                </div>
              </div>
        
              {
                getData.filter((items) =>
                items.firstName.toLowerCase().includes(search.toLowerCase()) // Case-insensitive search
              ).map((items, index) => (
                  <div className={styles.ArtistInfo}>
                  <div className={styles.items} key={index}>
                    <p>{items.firstName}</p>
                    <p>{`${items.lastName}@gmail.com`}</p>
                    <p>{items.id}</p>
                    <p>{items.biography}</p>
                    <p className={styles.Active}>{'Active'}</p>
                    {/* Add more artist details if needed */}
                  </div>
                  </div>
                ))
              }
             
             
            </div>
           </div>
          </div>
        </div>
      )}
    </>
  )
}