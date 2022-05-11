#如果文件夹不存在，则创建文件夹
iconsDir="icons.iconset"
if [ ! -d "$iconsDir" ]; then
  mkdir $iconsDir
fi
if hash icotool 2>/dev/null; then
echo '生成项目图标'
sips -z 16 16 icon.png --out icons.iconset/icon_16x16.png;
sips -z 32 32 icon.png --out icons.iconset/icon_16x16@2x.png;
sips -z 32 32 icon.png --out icons.iconset/icon_32x32.png;
sips -z 64 64 icon.png --out icons.iconset/icon_32x32@2x.png;
sips -z 64 64 icon.png --out icons.iconset/icon_64x64.png;
sips -z 128 128 icon.png --out icons.iconset/icon_64x64@2x.png;
sips -z 128 128 icon.png --out icons.iconset/icon_128x128.png;
sips -z 256 256 icon.png --out icons.iconset/icon_128x128@2x.png;
sips -z 256 256 icon.png --out icons.iconset/icon_256x256.png;
sips -z 512 512 icon.png --out icons.iconset/icon_256x256@2x.png;
sips -z 512 512 icon.png --out icons.iconset/icon_512x512.png;
sips -z 1024 1024 icon.png --out icons.iconset/icon_512x512@2x.png;
# mac安装包使用
iconutil -c icns icons.iconset -o resources/icon.icns;
# win窗口使用
icotool -c icons.iconset/icon_256x256.png -o resources/icon.ico
# mac窗口使用
sips -z 32 32 icon.png --out resources/icon.png;
sips -z 64 64 icon.png --out resources/icon@2x.png;
else
echo 'icotool命令不存在，运行: brew install icoutils 安装 icoutils工具'
fi
 