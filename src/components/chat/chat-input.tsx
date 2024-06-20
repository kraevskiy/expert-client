import { Button, Input, Tooltip } from '@nextui-org/react';
import { Paperclip, Send } from 'lucide-react';
import { useState } from 'react';

import { useChat } from '@/hooks/use-chat.ts';
import { useShallow } from 'zustand/react/shallow';
import { useSocket } from '@/hooks/use-socket.ts';

const Form = () => {
  const socket = useSocket();
  const { member, uploadFile } = useChat(useShallow(state => ({
    member: state.member,
    uploadFile: state.uploadFile,
  })));
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket && member && message.length > 0) {
      const messageData = { chatId: member.chatId, content: message, memberId: member?.id, fileUrl };
      socket.emit('messageToServer', messageData);
      setMessage('');
      setFileLoading(false);
      setFileUrl(null);
      setFile(null);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const handleUploadFile = async () => {
    if (file) {
      setFileLoading(true);
      const fileUpl = await uploadFile(file);
      if (fileUpl?.ok) {
        setFileUrl(fileUpl.fileUrl);
      }
      setFileLoading(false);
    }
  };

  return (
    <form className='px-2 py-3 flex justify-between items-center gap-4' onSubmit={handleSend}>
      <div className='flex-1 relative'>
        <Input value={message} onChange={e => setMessage(e.target.value)} />
        <div className='absolute top-[50%] right-2 -translate-y-1/2 '>
          <Tooltip
            content={
              <div className='flex flex-col gap-3'>
                <p>{file?.name}</p>
                {!fileUrl && <Button
                  color='primary'
                  isLoading={fileLoading}
                  onClick={handleUploadFile}
                >
                  Upload
                </Button>}
              </div>
            }
            isOpen={!!file}
          >
            <div>
              <Paperclip />
              <input
                type='file'
                className='opacity-0 absolute w-full h-full top-0 z-20'
                multiple={false}
                onChange={handleFile}
              />
            </div>
          </Tooltip>
        </div>
      </div>
      <div>
        <Button
          type='submit'
          isIconOnly
          className='bg-gradient-to-tr from-pink-500 to-yellow-500 z-50 text-white shadow-lg top-0 left-0'
        >
          <Send className='w-[1.2rem] h-[1.2rem]' />
        </Button>
      </div>
    </form>
  );
};

export default Form;
