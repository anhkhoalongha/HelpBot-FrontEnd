/* eslint-disable */

'use client';
import { Box } from '@chakra-ui/react'
import { SignOutButton } from "@clerk/nextjs";
import useProjectStore from '@/store/projectStore';
import LinkItem from './LinkItem';


export function SidebarLinks() {
  const { selectedProject } = useProjectStore()

  const createLinks = () => {
    return (
      <>
        <LinkItem url="/admin/default" activeUrl="/default" title="Dashboard" />
        <LinkItem url="/admin/manager-project" activeUrl="/manager-project" title="Chatbot Manager" />
        {selectedProject && (
          <>
            <LinkItem url={`/admin/script/${selectedProject.id}`} activeUrl="/script" title="Script" />
            <LinkItem url={`/admin/style/${selectedProject.id}`} activeUrl="/style" title="Style" />
            <LinkItem url={`/admin/install/${selectedProject.id}`} activeUrl="/install" title="Install" />
            <LinkItem url={`/admin/conversation/${selectedProject.id}`} activeUrl="/conversation" title="Conversation" />
          </>
        )}
        <LinkItem url="/admin/profile" activeUrl="/profile" title="Account" />
        <Box
          marginTop={'3%'}
          ml="10px"
        >
          <SignOutButton />
        </Box>
      </>
    )
  }
  //  BRAND
  return <>{createLinks()}</>
}

export default SidebarLinks
