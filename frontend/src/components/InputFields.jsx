import React from 'react'

const InputFields = ({name, value, icon: Icon}) => {
    return (
        <div className="flex gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <p className="text-xs text-gray-400 uppercase">{name}</p>
                <p className="text-sm text-gray-800">{value}</p>
            </div>
        </div>
    )
}

export default InputFields