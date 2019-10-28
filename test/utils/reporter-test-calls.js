
module.exports = [
    {
        method: 'reportTaskStart',
        args:   [
            new Date('1970-01-01T00:00:00.000Z'),
            [
                'Chrome 41.0.2227 / Mac OS X 10.10.1',
                'Firefox 47 / Mac OS X 10.10.1'
            ],
            'QAXS-10'
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'QAXS-8',
            new Date('1970-01-01T01:00:00.000Z'),
            'Successful execution',
            {
                'data':        'iVBORw0KGgoAAAANSUhEUgAABkIAAAO9CAYAAADezXv6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEn(...base64 file enconding)',
                'filename':    'image1.jpg',
                'contentType': 'image/jpeg'
            },
            [
                'PASSED',
                'FAILED',
                'PASSED'
            ],
            [
                {
                    'status':    'PASSED',
                    'comment':   'Coment on Test Step Result 1',
                    'evidences': [
                        {
                            'data':        'iVBORw0KGgoAAAANSUhEUgAABkIAAAO9CAYAAADezXv6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEn(...base64 file enconding)',
                            'filename':    'image11.jpg',
                            'contentType': 'image/jpeg'
                        }
                    ]
                },
                {
                    'status':    'PASSED',
                    'comment':   'Coment on Test Step Result 2',
                    'evidences': [
                        {
                            'data':        'iVBORw0KGgoAAAANSUhEUgAABkIAAAO9CAYAAADezXv6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEn(...base64 file enconding)',
                            'filename':    'image12.jpg',
                            'contentType': 'image/jpeg'
                        }
                    ]
                }
            ]
        ]
    },
    {
        method: 'reportTaskDone'
    }
];
