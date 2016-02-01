# RMMV_ImproveMessageWindow 

### 聲明
作者是菜鳥，遇到bug或覺得code很醜請多見諒QQ</br>
</br>
### 前置準備
1.下載它</br>
2.打開存放遊戲的目錄，進入js資料夾</br>
3.覆蓋原本的rpg_windows.js</br>
4.覆蓋原本的plugins資料夾</br>
5.開啟RMMV，按F10，在空白區按Enter，開啟getWindowPosition與getWindowWidth兩個插件</br>
</br> 
### 使用方式
1.編輯事件</br>
2.開啟本功能時，新增→腳本→輸入</br>
                getWindowPosition.Enable();
3.在顯示對話前，新增→腳本→輸入</br>
                getWindowPosition.getXY(輸入編號，具體在getXY的編號內詳述);
4.關閉此功能，或事件結束時，新增→腳本→輸入</br>
                getWindowPosition.Disable();
　事件結束時請務必完成本動作，否則將出錯</br>
</br>
### getXY的編號
希望對話框顯示在事件上方：直接填入地圖上事件的編號</br>
希望對話框顯示在主角上方：填0即可</br>
希望對話框顯示在跟隨者上方：第一位跟隨者填-1、第二位填-2，以此類推</br>
</br>
### 範例
                腳本：getWindowPosition.Enable();
                腳本：getWindowPosition.getXY(1);
                文字：無, 窗口, 底部
                ：A_A
                腳本：getWindowPosition.Disable();
