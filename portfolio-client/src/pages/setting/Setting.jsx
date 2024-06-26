import React, { useState } from "react";
import { Container, TextField, Button, Avatar, Grid, Box, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material"; // Import the icon for the button
import jduLogo from "../../assets/logo.png";
import SettingStyle from "./Setting.module.scss";

const Setting = () => {
  const [avatarImage, setAvatarImage] = useState(jduLogo); // Initial avatar image

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (!file) return; // Handle empty file upload

    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container maxWidth="md" className={SettingStyle["setting-container"]}>
       <Box display="flex" alignItems="center" justifyContent="space-between" className={SettingStyle["header"]}>
        <Box display="inline-flex" alignItems="center" position="relative">
          <Avatar alt="Jerome Bell" src={avatarImage} sx={{ width: 100, height: 100 }} />
          <label htmlFor="avatar-upload">
            <IconButton color="primary" aria-label="upload picture" component="span" size="small" style={{ position: 'absolute', bottom: 4, right: 4, backgroundColor: 'white' }}>
              <PhotoCamera />
            </IconButton>
          </label>
          <input accept="image/*" id="avatar-upload" type="file" style={{ display: 'none' }} onChange={handleAvatarChange} />
        </Box>
        <Box ml={2}>
          <h1 className={SettingStyle["h1"]}>Monkey D. Luffy</h1>
        </Box>
        <Box display="flex" alignItems="center" className={SettingStyle["button-group"]}>
          <Button variant="outlined" color="primary" className={SettingStyle["cancel-button"]} style={{ marginRight: '10px' }}>
            キャンセル
          </Button>
          <Button variant="contained" color="primary" className={SettingStyle["save-button"]}>
            保存
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField label="名" variant="outlined" fullWidth defaultValue="Default Admin" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="姓" variant="outlined" fullWidth defaultValue="Default Admin" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="電話番号" variant="outlined" fullWidth defaultValue="998 93 456 67 85" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="メール" variant="outlined" fullWidth defaultValue="admin@gmail.com" />
        </Grid>
      </Grid>
      <Box className={SettingStyle["section"]}>
        <h2 className={SettingStyle["h2"]}>パスワード</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField label="現在のパスワード" variant="outlined" fullWidth type="password" defaultValue="*********" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="新規パスワード" variant="outlined" fullWidth type="password" defaultValue="*********" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="パスワードを認証" variant="outlined" fullWidth type="password" defaultValue="S5a8%2#91" />
          </Grid>
        </Grid>
      </Box>
      <Box className={SettingStyle["section"]}>
        <h2 className={SettingStyle["h2"]}>JDU問い合わせ</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="メール" variant="outlined" fullWidth defaultValue="test@jdu.uz" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="電話番号" variant="outlined" fullWidth defaultValue="+998 90 234 56 78" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="勤務時間" variant="outlined" fullWidth defaultValue="09:00 - 18:00" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="ロケーション" variant="outlined" fullWidth defaultValue="Tashkent, Shayhontohur district, Sebzor, 21" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Setting;

            
