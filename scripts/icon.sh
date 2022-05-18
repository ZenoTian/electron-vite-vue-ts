#如果文件夹不存在，则创建文件夹
iconsDir="icons.iconset"
logoPng="./resources/icon.png"
iconDir="./resources/icon/"
if [ ! -d "$iconsDir" ]; then
  mkdir $iconsDir
fi
if hash icotool 2>/dev/null; then
echo '生成项目图标'
sips -z 16 16 ${logoPng} --out ${iconsDir}/icon_16x16.png;
sips -z 32 32 ${logoPng} --out ${iconsDir}/icon_16x16@2x.png;
sips -z 32 32 ${logoPng} --out ${iconsDir}/icon_32x32.png;
sips -z 64 64 ${logoPng} --out ${iconsDir}/icon_32x32@2x.png;
sips -z 64 64 ${logoPng} --out ${iconsDir}/icon_64x64.png;
sips -z 128 128 ${logoPng} --out ${iconsDir}/icon_64x64@2x.png;
sips -z 128 128 ${logoPng} --out ${iconsDir}/icon_128x128.png;
sips -z 256 256 ${logoPng} --out ${iconsDir}/icon_128x128@2x.png;
sips -z 256 256 ${logoPng} --out ${iconsDir}/icon_256x256.png;
sips -z 512 512 ${logoPng} --out ${iconsDir}/icon_256x256@2x.png;
sips -z 512 512 ${logoPng} --out ${iconsDir}/icon_512x512.png;
sips -z 1024 1024 ${logoPng} --out ${iconsDir}/icon_512x512@2x.png;
# mac安装包使用
iconutil -c icns $iconsDir -o ${iconDir}icon.icns;
# win窗口使用
icotool -c $iconsDir/icon_128x128.png -o ${iconDir}icon.ico
# mac窗口使用
sips -z 32 32 ${logoPng} --out ${iconDir}icon.png;
sips -z 64 64 ${logoPng} --out ${iconDir}icon@2x.png;

# web项目使用
cp ${logoPng} ./packages/renderer/public/images/;
cp ${iconDir}icon.ico ./packages/renderer/public/favicon.ico;

else
echo 'icotool命令不存在，运行: brew install icoutils 安装 icoutils工具'
fi
 