# RMMV_ImproveMessageWindow 

【聲明】</br>
作者是菜鳥，遇到bug或覺得code很醜請多見諒QQ</br>
</br>
【前置準備】</br>
0. 下載它</br>
1. 打開存放遊戲的目錄，進入js資料夾</br>
2. 覆蓋原本的rpg_windows.js</br>
3. 將getWindowPosition.js與getWindowWidth.js移入plugins資料夾</br>
4. 開啟RMMV，按F10，在空白區按Enter，開啟getWindowPosition與getWindowWidth兩個插件</br>
</br>
【使用方式】</br>
1. 編輯事件</br>
2. 開啟本功能時，</br>
　 新增→腳本→輸入getWindowPosition.Enable();</br>
3. 在顯示對話前，</br>
　 新增→腳本→輸入getWindowPosition.getXY(括號內是該事件的編號);</br>
4. 關閉此功能，或事件結束時，</br>
　 新增→腳本→輸入getWindowPosition.Disable();</br>
　 ※事件結束時請務必完成本動作，否則將出錯</br>
</br>
【範例】</br>
<font color="#4400B3">腳本：</font><font color="#8C8C8C">getWindowPosition.Enable();</font></br>
<font color="#4400B3">腳本：</font><font color="#8C8C8C">getWindowPosition.getXY(1);</font></br>
<font color="#4400B3">文字：</font><font color="#8C8C8C">無, 窗口, 底部</font></br>
　　<font color="#4400B3">：A_A</font></br>
<font color="#4400B3">腳本：</font><font color="#8C8C8C">getWindowPosition.Disable();</font></br>
