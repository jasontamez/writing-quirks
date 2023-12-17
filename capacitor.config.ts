import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'net.jasontank.writingquirks',
  appName: 'writing-quirks',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
