function validateFile(file: File): null | {isValid: boolean; errMsg: string; } {

    let isValid = null;
    let errMsg = '';

    const maxFileSize = 5 * 1024 * 1024; // 5MB
  
    // 파일명 가져오기
    const fileNameTest = file?.name ? file.name : '';


    // 파일 이름이 없으면 함수 종료
    if (!fileNameTest) { return { isValid, errMsg }; }


    const matches = fileNameTest.match(/(.*?)(\.[^.]*$)/);
    const fileName = matches ? matches[1] : fileNameTest;
    
    // 파일명 확인 (영문 문자만 허용)
    const regex = /^[A-Za-z0-9!@#$%^&()_\-+={} \[\] ,. ]*$/;
    const isEnglishName = regex.test(fileName); // 확장자를 제외한 파일명 확인

    
    // 파일 크기 검사 (5MB 이하이고, 0보다 큰 경우)
    const isValidSize = file.size > 0 && file.size <= maxFileSize;
    
    
    if ( !isEnglishName ) {
        errMsg = '파일 크기를 확인해주세요. 제한 용량은 5MB 입니다.';
    }
    if ( !isEnglishName ) {
        errMsg = '파일명을 확인해주세요. 이미지 업로드는 영문만 가능합니다.';
    }

    isValid = isEnglishName && isValidSize;
    return { isValid, errMsg };
  }

  export { validateFile };
  