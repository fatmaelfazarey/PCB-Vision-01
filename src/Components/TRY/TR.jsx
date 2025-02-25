import React from 'react'
import { useTranslation } from 'react-i18next';

const TC = () => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            <p>{t('Fatma Mohamed Mahmoud')}</p>
            <button
                onClick={() => i18n.changeLanguage('ar')}
            >{t('English')}</button>
        </div >
    )
}

export default TC
