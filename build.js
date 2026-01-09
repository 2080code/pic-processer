import {rmSync} from 'fs';
import {spawnSync} from 'child_process'


try {
  console.log('清理目录...');
  rmSync('./dist',{recursive:true,force:true})
  rmSync('./demo',{recursive:true,force:true})

  console.log('开始构建库...');
  spawnSync('call npm run build:lib',{
    shell:true,
    detached:false,
    stdio:'inherit',
  })

  console.log('开始构建演示...');
  spawnSync('call npm run build:demo',{
    shell:true,
    detached:false,
    stdio:'inherit',
  })
} catch (error) {
  console.log(error);
}
