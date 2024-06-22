import React from "react";
import { Container, TextField, Button, Avatar, Grid, Box, IconButton } from "@mui/material";
import "./Setting.scss";

const Setting = () => {
  return (
    <Container maxWidth="md" className="setting-container">
      <Box display="flex" alignItems="center" justifyContent="space-between" className="header">
        <Box display="flex" alignItems="center">
          <Avatar
            alt="Jerome Bell"
            src="https://via.placeholder.com/200"
            className="avatar"
          />
          <Box ml={2}>
            <h1>Jerome Bell</h1>
          </Box>
        </Box>
        <Box>
          <Button variant="outlined" color="primary" className="cancel-button">
            キャンセル
          </Button>
          <Button variant="contained" color="primary" className="save-button">
            保存
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField label="名" variant="outlined" fullWidth defaultValue="Jerome Bell" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="姓" variant="outlined" fullWidth defaultValue="Jerome Bell" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="電話番号" variant="outlined" fullWidth defaultValue="998 93 456 67 85" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="メール" variant="outlined" fullWidth defaultValue="jerome_bell@gmail.com" />
        </Grid>
      </Grid>
      <Box className="section">
        <h2>パスワード</h2>
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
      <Box className="section">
        <h2>JDU問い合わせ</h2>
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
