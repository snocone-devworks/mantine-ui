import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => {
  return {
    shell: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
      minHeight: '100vh'
    },
    main: {
      display: 'flex',
      flexDirection: 'column'
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
    },
    smallIcon: {
      height: '28px',
      width: '28px'
    },
    icon: {
      height: '20px',
      width: '20px',
      marginLeft: '0.6rem',
      color: theme.colorScheme === 'dark' ? theme.colors.yellow[5] : theme.colors.violet[5]
    }
  }
})