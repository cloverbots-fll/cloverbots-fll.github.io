import type { AppProps } from 'next/app'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/components/css/globals.css';
import '@/components/css/toolbox.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blockly - Spike PRIME",
  description: "Code the Lego Spike PRIME robot with Blockly in basic Python."
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      <Toaster position="bottom-center" toastOptions={{
        unstyled: true,
        classNames: {
          error: 'flex flex-row items-center space-x-2 bg-red-500 px-10 py-5 rounded text-white',
          success: 'flex flex-row items-center space-x-2 bg-green-600 px-10 py-5 rounded text-white',
          warning: 'flex flex-row items-center space-x-2 bg-yellow-700 px-10 py-5 rounded text-white',
          info: 'flex flex-row items-center space-x-2 bg-blue-500 px-10 py-5 rounded text-white',
        },
      }}/>

      <Component {...pageProps} />
    </ThemeProvider>
  );
}