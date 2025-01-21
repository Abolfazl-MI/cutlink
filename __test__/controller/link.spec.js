const LinkModel = require('../../app/http/models/link_model')
const {LinkController} = require("../../app/http/controllers/link.controller");

jest.mock("../../app/http/models/link_model");

it('should increase view of link by one', async () => {
    const request = {
        params: {
            linkId: "uniqueLinkId",
        },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        redirect: jest.fn(),  // Mock redirect method

    };
    const next = jest.fn();
    const saveMock = jest.fn();
    const linkData={
        original_link: "https://abolfazmashhadi.ir",
        shorten_link: "uniqueLinkId",
        owner: "ownerId",
        clicks: 0,
        save:saveMock
    }
    // Mock the save method
    LinkModel.findOne.mockImplementationOnce(() => (linkData))
    await LinkController.openLink(request, res, next)
    // Verify that the clicks were incremented by 1
    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(linkData.clicks).toBe(1)

});