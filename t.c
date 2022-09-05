#include <stdio.h>

int ft_str_is_alpha(char *str) {
    int i;
    
    i = 0;
    while (str[i] != '\0') {
        if ((str[i] < 'a' || str[i] > 'z') && (str[i] < 'A' || str[i] > 'Z'))
            return 0;
        i++;
    }
    return 1;
}

int main() {
    printf("%d\n", ft_str_is_alpha("samira"));
    printf("%d\n", ft_str_is_alpha("SAMra"));
    printf("%d\n", ft_str_is_alpha("sami,merra"));
    printf("%d\n", ft_str_is_alpha("sam ira"));
}