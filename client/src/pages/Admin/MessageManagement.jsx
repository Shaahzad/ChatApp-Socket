import React, { useEffect, useState } from 'react'
import Adminlayout from '../../components/Layout/Adminlayout'
import { Avatar, Box, Stack } from '@mui/material'
import Table from '../../components/Shared/Table'
import { dashboardData } from '../../Constants/Sampledata'
import { fileformat, transformImage } from "../../lib/Features"
import moment from 'moment'
import Renderattachment from '../../components/Shared/Renderattachment'
const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    width: 200
  },
  {
    field: 'attachments',
    headerName: 'Attachments',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row

      return attachments?.length > 0 ? attachments.map((attachment) => {
        const url = attachment.url;
        const file = fileformat(url)
        return <Box>
       <a href={url}
       download
       target='_blank'
       style={{
        color: 'black'
       }}
       >
       {Renderattachment(file, url)}
       </a>
        </Box>
      })
        :
        'No Attachments'
    }
  },
  {
    field: 'content',
    headerName: 'Content',
    headerClassName: 'table-header',
    width: 400,
  },
  {
    field: 'sender',
    headerName: 'Sent By',
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => (
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        <Avatar src={params.row.sender.name} alt={params.row.sender.name} />
        <span>{params.row.sender.name}</span>
      </Stack>
    )
  },
  {
    field: 'chat',
    headerName: 'Chat',
    headerClassName: 'table-header',
    width: 220,
  },
  {
    field: 'groupChat',
    headerName: 'Group Chat',
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'createdAt',
    headerName: 'Time',
    headerClassName: 'table-header',
    width: 250,
  },
]



const MessageManagement = () => {
  const [rows, setRows] = useState([])
  useEffect(() => {
    setRows(dashboardData.messages.map(i => ({
      ...i,
      id: i._id,
      sender: {
        name: i.sender.name,
        avatar: transformImage(i.sender.avatar, 50)
      },
      createdAt: moment(i.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
    })))
  }, [])
  return (
    <Adminlayout>
      <Table heading={'All Messages'} columns={columns} rows={rows} rowHeight={200}/>
    </Adminlayout>
  )
}

export default MessageManagement