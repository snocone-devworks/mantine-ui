import { createStyles } from "@mantine/core";

export const useContainerStyles = createStyles((theme) => {
  return {
    shell: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto'
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'fit-content',
    },
    headerContent: {
      display: 'flex', 
      flex: '1 1 auto',
      flexDirection: 'row',
    },
    toggleContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    chipContent: {
      display: 'flex', 
      flexDirection: 'row',
      alignItems: 'center',
      background: 'transparent',
      backgroundColor: 'transparent',
    },
    smallIcon: {
      height: '1.8rem',
      width: '1.8rem',
    },
    icon: {
      height: '1.2rem',
      width: '1.2rem',
      marginLeft: '0.6rem',
      color: theme.colorScheme === 'dark' ? theme.colors.yellow[5] : theme.colors.violet[5]
    }
  }
})